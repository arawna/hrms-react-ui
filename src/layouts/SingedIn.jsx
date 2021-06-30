import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import { userLogout } from "../store/actions/authActions"

export default function SingedIn() {

    const {authItem} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const history = useHistory();

    const handleLogout=(user)=>{
        dispatch(userLogout(user))
        history.push("/")
    }

    return (
        <div>
            <Menu.Item>
                <Dropdown pointing="top right" text={authItem[0].user.name}>
                    <Dropdown.Menu>
                        {authItem[0].user.userType===1 &&<Dropdown.Item as={Link} to={`/cvs/${authItem[0].user.id}`}><Icon name='cloud upload' />Cv ni Güncelle</Dropdown.Item>}
                        {authItem[0].user.userType===2 &&<Dropdown.Item><Icon name='cloud upload' />Şirket bilgilerini güncelle</Dropdown.Item>}
                        <Dropdown.Item onClick={()=>handleLogout(authItem[0].user)}><Icon name='sign-out' /> Çıkış yap</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
