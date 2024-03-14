import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
//   window.deferredPrompt = e;
// })
// 显示添加桌面图标提示
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// window.addEventListener('beforeinstallprompt', function(event: any) {
//   event.userChoice.then(function(choiceResult: {outcome: string}) {
//     if (choiceResult.outcome === 'accepted') {
//       console.log('用户接受添加桌面图标');
//     } else {
//       console.log('用户拒绝添加桌面图标或安装被取消');
//     }
//   });
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
