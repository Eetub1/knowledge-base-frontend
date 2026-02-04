import { Container } from "react-bootstrap"

const Profile = ({user}) => {
    return (
        <Container>
            <p>Username: {user?.username}</p>
        </Container>
    )
}

export default Profile