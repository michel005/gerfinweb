import styled from "styled-components";

const UserStyle = styled.div`
.field {
    margin-top: 14px;
    margin-bottom: 14px;
    max-width: 300px;
}

.commands {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;

    .alert {
        color: #ccc;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 14px;
    }
}
`

export default UserStyle