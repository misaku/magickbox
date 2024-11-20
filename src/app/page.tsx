'use client'
import { useState } from "react";
import styles from "./page.module.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Caveat } from 'next/font/google'
import type { DatePickerProps } from 'antd';
import { DatePicker, ConfigProvider, theme, Alert, Button, Space, Modal  } from 'antd';
import locale from 'antd/locale/pt_BR';
/* eslint-disable  @typescript-eslint/no-explicit-any */
const messages: any = {
  '09/09/1990':"Te amo meu presente de Deus!\nBora dominar o mundo?",
  '30/12/1953':"Te amo Dona Maria de Fátima!\nVocê é a melhor mãe do mundo!",
}

const keyMessages = Object.keys(messages)

// If loading a variable font, you don't need to specify the font weight
const caveat = Caveat({subsets: ['latin']})
export default function Home() {
  const [birthday,setBirthday] = useState('')
  const [message,setMessage] = useState('')
  const [error,setError] = useState('')
  const hideModal = () => setMessage('')
  const getMessage = ()=>{
    if(birthday!==''){
      if(keyMessages.includes(birthday)){
        setMessage(messages[birthday])
        return;
      }
      setError("Não encontramos uma mensagem pra você, verifique se sua data de aniversário esta correto.")
      return;
    }
    setError("Selecione uma data por favor!")
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setBirthday(String(dateString))
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header>
          <div className={styles.wrapLootie}>
          <DotLottieReact
        src="https://lottie.host/b423ce14-bc96-419f-b337-e29f440b7059/IN1iHeWlsG.lottie"
        loop
        autoplay
         />
          </div>
  
          <h1 className={caveat.className}>Oba, se você recebeu esse link é porque temos uma mensagem a sua!</h1>
        </header>
        <ConfigProvider locale={locale}
         theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#27debf',
            borderRadius: 10,
          },

        }}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Space.Compact style={{ width: '100%' }}>
              <DatePicker
          onChange={onChange}
           placeholder="Informe sua data de aniversário" 
            style={{flex: 1}}
            format={'DD/MM/YYYY'}
           />
            <Button type="primary" onClick={getMessage}>Buscar</Button>
              </Space.Compact>
                {!!error && (
                    <Alert
                    message="Ops, Algo deu errado!"
                    description={error}
                    type="error" 
                    showIcon
                    onClose={()=>setError('')} 
                    closable 
                   />
                )} 
               </Space>
           </ConfigProvider>
           <Modal
        open={!!message}
        onOk={hideModal}
        onCancel={hideModal}
        footer=""
  
      >
        {message.split('\n').map(str => <p className={caveat.className} key={str} style={{fontSize: '2rem'}}>{str}</p>)}
      </Modal>
      </main>

    </div>
  );
}
