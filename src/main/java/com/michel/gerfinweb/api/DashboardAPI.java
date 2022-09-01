package com.michel.gerfinweb.api;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
        BigDecimal minValue = BigDecimal.ZERO;
        BigDecimal maxValue = BigDecimal.ZERO;
        while (currentDay <= finalDataBase.getMonth().length(finalDataBase.isLeapYear())) {
        	BigDecimal balance = BigDecimal.ZERO;
        	LocalDate currentDate = LocalDate.of(finalDataBase.getYear(), finalDataBase.getMonth(), currentDay);
        	if (LocalDate.now().compareTo(currentDate) >= 0) {
        		balance = movementRepository.currentBalance(currentDate, userFinded.get());
        	} else {
        		balance = movementRepository.futureBalance(currentDate, userFinded.get());
        	}
        	balanceByDay.put(currentDay, balance);
        	if (balance.compareTo(minValue) < 0) {
        		minValue = balance;
        	}
        	if (balance.compareTo(maxValue) > 0) {
        		maxValue = balance;
        	}
        	currentDay++;
        }
        BalanceByDayModel bbd = new BalanceByDayModel();
        bbd.setBalances(balanceByDay);
        bbd.setMaxValue(maxValue);
        bbd.setMinValue(minValue);
        
        model.setBalancePerDay(bbd);
        
        return ResponseEntity.ok(model);
    }

}
