
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert, Form, Input, Button, Row, Col } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { AuthContext } from "../App";

export const Login = () => {

    const history = useHistory()
    const { user, setUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        if (user !== undefined) {
            history.push('/')
        }
    })

    const onFinish = values => {
        fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: values.email,
                password: values.password
            }),
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                setErrorMessage('EMAIL E/OU SENHA INVÁLIDO(S)!')
                throw new Error('Something went wrong')
            }
        })
        .then(result => {
            setUser({
                token: result.token,
                user_id: result.user_id,
                first_name: result.first_name
            })
            localStorage.setItem('token', result.token)
            localStorage.setItem('user_id', result.user_id)
            localStorage.setItem('first_name', result.first_name)
        })
        .catch(error => console.log(error))
    }

    const onFinishFailed = errorInfo => {
        console.log('Erro:', errorInfo);
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'É NECESSÁRIO PREENCHER ESTE CAMPO!',
        types: {
            email: 'O EMAIL INSERIDO NÃO É VÁLIDO!',
        },
    };

    return (
        <Row justify="center">
            <Col style={{ width: 400 }}>
                <Form
                    name="basic"
                    layout="vertical"
                    requiredMark="optional"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    validateMessages={validateMessages}
                    >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email'
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined style={{ color: "#B3B3B3" }} className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined style={{ color: "#B3B3B3" }} className="site-form-item-icon" />} placeholder="Senha" />
                    </Form.Item>
                    {errorMessage !== null &&
                        <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: '25px' }} />
                    }
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            ACESSAR
                        </Button>
                        NÃO POSSUI UMA CONTA? <Link to="/register">CADASTRE-SE!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}