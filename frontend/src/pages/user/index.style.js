import styled from "styled-components";

const UserStyle = styled.div`
.field {
    margin-bottom: 14px;
    margin-top: 14px;
}

.commands {
    display: flex;
    flex-direction: row;

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