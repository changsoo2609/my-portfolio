import { useEffect } from 'react';

// 기존 Cloudflare 챗봇(turnstile + Worker API)을 그대로 마운트한다.
// React가 렌더링한 헤더의 슬롯이 준비된 뒤 한 번만 스크립트를 주입해
// 이벤트 중복 등록과 런처 위치 오류를 막는다.
let injected = false;

export default function ChatWidget() {
  useEffect(() => {
    if (injected || document.getElementById('pf-chat')) return;
    injected = true;
    const script = document.createElement('script');
    script.src = './chatbot-widget.js?v=react';
    document.body.appendChild(script);
  }, []);

  return null;
}
