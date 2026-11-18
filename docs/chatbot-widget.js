(() => {
  'use strict';
  const config = window.PORTFOLIO_CHAT_CONFIG || {};
  const enabled = String(config.apiUrl || '').startsWith('https://') && !!config.turnstileSiteKey;
  const quickQuestions = [
    '어떤 풀스택 개발 경험이 있나요?',
    '농담 프로젝트 수상과 담당 역할은?',
    'GenMark AI에서 맡은 백엔드 작업은?',
    '프론트엔드 경험은 어떤가요?',
  ];
  const offlineAnswers = [
    'ClassFlowAI에서 웹 화면·Agent·인증·학습 기능을 연동했고, 해빛에서 사용자 UI를, GenMark AI와 농담 프로젝트에서 백엔드와 데이터베이스 연동을 경험했습니다.',
    '농담은 농장주와 외국인 근로자의 현장 소통을 돕는 1박 2일 솔버톤 팀 프로젝트입니다. MVP 범위를 간이 번역과 현장 용어 피드백으로 좁혔고, FastAPI·Supabase API와 PyTest 검증, 밤샘 디버깅으로 시연 안정화에 기여했습니다. 팀은 최우수상(1위)을 수상했습니다.',
    'GenMark AI에서 API 계약과 데이터 모델링, Spring Boot 서비스 백엔드 및 MariaDB 연동 등 팀 백엔드 개발에 참여했습니다.',
    '해빛에서 HTML·CSS·JavaScript로 부모/아이 화면, 미션 인증, 보상과 펫 성장 UI를 구현했습니다.',
  ];
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };
  const launcher = make('button', '', 'Q/A');
  launcher.id = 'pf-chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-controls', 'pf-chat');
  launcher.setAttribute('aria-expanded', 'false');
  const panel = make('section');
  panel.id = 'pf-chat';
  panel.hidden = true;
  panel.setAttribute('aria-label', '포트폴리오 질문 챗봇');
  const header = make('div', 'pf-chat-header');
  const titleBox = make('div');
  titleBox.append(make('strong', '', '포트폴리오 안내 AI'));
  titleBox.append(make('p', '', '프로젝트·역할·기술 경험을 질문해 보세요.'));
  const close = make('button', 'pf-chat-close', '×');
  close.type = 'button';
  close.setAttribute('aria-label', '채팅창 닫기');
  header.append(titleBox, close);
  const messages = make('div');
  messages.id = 'pf-chat-messages';
  messages.setAttribute('role', 'log');
  messages.setAttribute('aria-live', 'polite');
  const quick = make('div', 'pf-chat-quick');
  const form = make('form', 'pf-chat-form');
  const label = make('label', '', '질문을 입력하세요 (400자 이내)');
  label.htmlFor = 'pf-chat-question';
  const question = make('textarea');
  question.id = 'pf-chat-question';
  question.maxLength = 400;
  question.required = true;
  question.placeholder = '예: 농담 프로젝트에서 어떤 문제를 해결했나요?';
  question.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (typeof form.requestSubmit === 'function') form.requestSubmit();
      else submit.click();
    }
  });
  const captcha = make('div');
  captcha.id = 'pf-chat-turnstile';
  const submit = make('button', '', enabled ? 'AI에게 질문하기' : '질문하기');
  submit.type = 'submit';
  const status = make('span', '', enabled ? '봇 검증을 완료하면 질문을 보낼 수 있습니다.' : '포트폴리오에 관한 질문에 준비된 답변으로 안내합니다.');
  status.id = 'pf-chat-status';
  form.append(label, question, captcha, submit, status);
  const links = make('div', 'pf-chat-links');
  [
    ['농담 GitHub', 'https://github.com/da960822-ux/kidding'],
    ['GenMark AI', 'https://github.com/mgim14636-art/GenMark_AI'],
    ['해빛', 'https://github.com/kimyoungsu61/Child_Habit'],
  ].forEach(([label, url]) => {
    const a = make('a', '', `${label} GitHub ↗`);
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    links.append(a);
  });
  panel.append(header, messages, quick, form, links);
  document.body.append(panel, launcher);

  let widgetId = null;
  let busy = false;
  const write = (text, type = 'bot') => {
    const div = make('div', `pf-bubble ${type}`, text);
    messages.append(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  };
  write(enabled ? '안녕하세요. 공개된 프로젝트 소개를 바탕으로 답변합니다. 비밀번호나 개인정보는 입력하지 마세요.' : '안녕하세요. 프로젝트, 담당 역할, 기술 경험에 대해 질문해 주세요. 준비된 내용을 바탕으로 안내합니다.');
  const localAnswers = [
    { words: ['classflow', '클래스플로우', '클래스 플로우'], answer: 'ClassFlowAI는 개인 프로젝트입니다. 웹 화면과 Agent, 인증 및 학습 기능을 연동했습니다. 자세한 내용은 포트폴리오의 ClassFlowAI 소개를 확인해 주세요.' },
    { words: ['농담', '農談', '밭머리', 'batmeori', '솔버톤', '최우수', '수상'], answer: offlineAnswers[1] },
    { words: ['genmark', '젠마크', '젠 마크'], answer: offlineAnswers[2] },
    { words: ['해빛', 'haebit', '펫', '부모', '아이'], answer: offlineAnswers[3] },
    { words: ['프론트', 'frontend', 'front-end', '화면', 'ui'], answer: offlineAnswers[3] },
    { words: ['풀스택', 'fullstack', 'full-stack', '경험', '프로젝트'], answer: offlineAnswers[0] },
    { words: ['백엔드', 'backend', 'back-end', '서버', 'api', '데이터베이스', 'db'], answer: 'GenMark AI에서는 Spring Boot와 MariaDB를, 농담 프로젝트에서는 FastAPI와 Supabase를 활용한 백엔드 개발에 참여했습니다.' },
  ];
  function answerLocally(text) {
    const normalized = text.toLowerCase();
    const match = localAnswers.find(item => item.words.some(word => normalized.includes(word)));
    return match ? match.answer : '해당 질문에 대한 준비된 답변을 찾지 못했습니다. ClassFlowAI, 농담 프로젝트, GenMark AI, 해빛 또는 프론트엔드·백엔드 경험에 대해 질문해 주세요.';
  }
  quickQuestions.forEach((q, i) => {
    const button = make('button', '', q);
    button.type = 'button';
    button.addEventListener('click', () => {
      question.value = q;
      if (!enabled) {
        write(q, 'user');
        write(offlineAnswers[i]);
        question.value = '';
      } else {
        question.focus();
      }
    });
    quick.append(button);
  });

  async function loadTurnstile() {
    if (!enabled || window.turnstile || document.getElementById('pf-turnstile-script')) return;
    const script = document.createElement('script');
    script.id = 'pf-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      widgetId = window.turnstile.render(captcha, {
        sitekey: config.turnstileSiteKey,
        action: 'portfolio_chat',
        theme: 'light',
        size: 'normal',
        appearance: 'interaction-only',
      });
    };
    script.onerror = () => { status.textContent = '봇 검증 모듈을 불러오지 못했습니다.'; };
    document.head.append(script);
  }

  function toggle(open) {
    panel.hidden = !open;
    launcher.hidden = open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      loadTurnstile();
      question.focus();
    } else {
      launcher.focus();
    }
  }
  launcher.addEventListener('click', () => toggle(true));
  close.addEventListener('click', () => toggle(false));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) toggle(false);
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (busy) return;
    const text = question.value.trim();
    if (!text) return;
    if (!enabled) {
      write(text, 'user');
      write(answerLocally(text));
      question.value = '';
      status.textContent = '포트폴리오의 준비된 내용을 바탕으로 안내했습니다.';
      return;
    }
    const token = widgetId !== null ? window.turnstile?.getResponse(widgetId) : '';
    if (!token) {
      status.textContent = '봇 검증을 완료한 뒤 다시 보내주세요.';
      return;
    }
    busy = true;
    submit.disabled = true;
    write(text, 'user');
    question.value = '';
    status.textContent = '답변을 생성하고 있습니다.';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);
      let response;
      try {
        response = await fetch(config.apiUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question: text, turnstileToken: token }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }
      const payload = await response.json();
      if (response.ok && typeof payload.answer === 'string') {
        write(payload.answer);
        status.textContent = '답변은 공개 포트폴리오 자료를 기반으로 생성되었습니다.';
      } else if (response.status === 429) {
        write('오늘의 질문 한도에 도달했습니다. 프로젝트 GitHub 링크에서 상세 내용을 확인해 주세요.');
        status.textContent = '무료 사용량 보호가 작동 중입니다.';
      } else if (response.status === 403) {
        write('봇 검증이 실패했습니다. 다시 인증한 뒤 질문해 주세요.');
        status.textContent = '인증 실패';
      } else {
        write('현재 AI 답변을 제공할 수 없습니다. 아래 GitHub 링크를 이용해 주세요.');
        status.textContent = '서버 응답 오류';
      }
    } catch {
      write('연결을 확인할 수 없습니다. 아래 프로젝트 링크를 이용해 주세요.');
      status.textContent = '연결 오류 또는 시간 초과';
    } finally {
      busy = false;
      submit.disabled = false;
      if (widgetId !== null) window.turnstile?.reset(widgetId);
    }
  });
})();
