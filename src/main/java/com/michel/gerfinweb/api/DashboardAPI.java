package com.michel.gerfinweb.api;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.michel.gerfinweb.model.FutureCurrentBalanceByDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.michel.gerfinweb.entity.User;
import com.michel.gerfinweb.model.BalanceByDayModel;
import com.michel.gerfinweb.model.DashboardModel;
import com.michel.gerfinweb.repository.AccountRepository;
import com.michel.gerfinweb.repository.MovementRepository;
import com.michel.gerfinweb.repository.TargetRepository;
import com.michel.gerfinweb.repository.UserRepository;
import com.michel.gerfinweb.utils.DateUtils;

@RestController
@RequestMapping("/dashboard")
public class DashboardAPI {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private TargetRepository targetRepository;
    @Autowired
    private MovementRepository movementRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    private ResponseEntity<?> get(Authentication authentication, @RequestParam String dataBase) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        
        LocalDate finalDataBase = DateUtils.toLocalDate(dataBase, "ddMMyyyy");
    	DashboardModel model = new DashboardModel();
    	model.setAccounts(accountRepository.findByUser(DateUtils.firstDay(finalDataBase), DateUtils.lastDay(finalDataBase), userFinded.get().getId()));
    	model.setTargets(targetRepository.findByUser(userFinded.get()));

        PageRequest pageable = PageRequest.of(0, 5);
    	model.setPendentMovements(movementRepository.findPendentByUser(pageable, DateUtils.firstDay(finalDataBase), DateUtils.lastDay(finalDataBase), userFinded.get()));
    	
    	Map<Integer, BigDecimal> balanceByDay = new HashMap<>();
        int currentDay = 1;

        List<FutureCurrentBalanceByDay> balancesByDay = movementRepository.balanceByDay(DateUtils.firstDay(finalDataBase), DateUtils.lastDay(finalDataBase), userFinded.get());

        BigDecimal acumulativeBalance;
        if (LocalDate.now().compareTo(DateUtils.firstDay(finalDataBase)) >= 0) {
            acumulativeBalance = movementRepository.currentBalance(DateUtils.firstDay(finalDataBase).minusDays(1), userFinded.get());
        } else {
            acumulativeBalance = movementRepository.futureBalance(DateUtils.firstDay(finalDataBase).minusDays(1), userFinded.get());
        }

        while (currentDay <= finalDataBase.getMonth().length(finalDataBase.isLeapYear())) {
            LocalDate currentDate = LocalDate.of(finalDataBase.getYear(), finalDataBase.getMonth(), currentDay);
            balanceByDay.put(currentDay, BigDecimal.ZERO);
            currentDay++;
        }

        balancesByDay.forEach((day) -> {
            if (LocalDate.now().compareTo(day.getDate()) >= 0) {
                balanceByDay.put(day.getDate().getDayOfMonth(), day.getCurrentBalance());
            } else {
                balanceByDay.put(day.getDate().getDayOfMonth(), day.getFutureBalance());
            }
        });

        Map<Integer, BigDecimal> definitiveBalanceByDay = new HashMap<>();

        Map<String, BigDecimal> minMaxValue = new HashMap<>();
        minMaxValue.put("sum", acumulativeBalance);
        minMaxValue.put("min", BigDecimal.ZERO);
        minMaxValue.put("max", BigDecimal.ZERO);
        balanceByDay.forEach((day, value) -> {
            minMaxValue.put("sum", minMaxValue.get("sum").add(value));
            if (minMaxValue.get("sum").compareTo(minMaxValue.get("min")) < 0) {
                minMaxValue.put("min", minMaxValue.get("sum"));
            }
            if (minMaxValue.get("sum").compareTo(minMaxValue.get("max")) > 0) {
                minMaxValue.put("max", minMaxValue.get("sum"));
            }
            definitiveBalanceByDay.put(day, minMaxValue.get("sum"));
        });

//        while (currentDay <= finalDataBase.getMonth().length(finalDataBase.isLeapYear())) {
//            BigDecimal balance;
//            LocalDate currentDate = LocalDate.of(finalDataBase.getYear(), finalDataBase.getMonth(), currentDay);
//
//            BigDecimal sumCurrent = balancesByDay.stream().filter((e) -> e.getDate().compareTo(currentDate) <= 0).map(FutureCurrentBalanceByDay::getCurrentBalance).reduce(BigDecimal.ZERO, BigDecimal::add);
//            BigDecimal sumFuture = balancesByDay.stream().filter((e) -> e.getDate().compareTo(currentDate) <= 0).map(FutureCurrentBalanceByDay::getFutureBalance).reduce(BigDecimal.ZERO, BigDecimal::add);
//
//            if (LocalDate.now().compareTo(currentDate) >= 0) {
//                balance = sumCurrent;
//            } else {
//                balance = sumFuture;
//            }
//
//            balanceByDay.put(currentDay, acumulativeBalance.add(balance));
//            if (balance.compareTo(minValue) < 0) {
//                minValue = balance;
//            }
//            if (balance.compareTo(maxValue) > 0) {
//                maxValue = balance;
//            }
//            currentDay++;
//        }
        System.out.println(definitiveBalanceByDay);
        BalanceByDayModel bbd = new BalanceByDayModel();
        bbd.setBalances(definitiveBalanceByDay);
        bbd.setMaxValue(minMaxValue.get("max"));
        bbd.setMinValue(minMaxValue.get("min"));
        
        model.setBalancePerDay(bbd);
        
        return ResponseEntity.ok(model);
    }

}
