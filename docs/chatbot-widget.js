(() => {
  'use strict';
  const config = window.PORTFOLIO_CHAT_CONFIG || {};
  const enabled = String(config.apiUrl || '').startsWith('https://') && !!config.turnstileSiteKey;
  const quickQuestions = [
    '어떤 직무를 희망하고 어떤 경험이 있나요?',
    '밭머리 프로젝트 수상과 담당 역할은?',
    'GenMark AI에서 맡은 백엔드 작업은?',
    '프론트엔드 경험은 어떤가요?',
  ];
  const offlineAnswers = [
    'AI 서비스 개발자와 주니어 풀스택 엔지니어를 희망합니다. ClassFlowAI의 OCR 기록과 학습 기능, 해빛 UI, 밭머리와 GenMark AI의 백엔드 개발을 경험했습니다.',
    '밭머리는 농담(農談) 팀이 2026 전남광주 청년 AI 솔버톤에서 만든, 농장주와 외국인 근로자의 작업 소통을 돕는 프로젝트입니다. FastAPI·Supabase 백엔드의 접근 권한, 작업 버전과 전달 API를 맡았습니다. 팀은 최우수상(트랙 1위)을 수상했습니다.',
    'GenMark AI는 로고 생성과 상표 유사도 분석 서비스입니다. 팀 README에는 백엔드 개발과 AI 프롬프팅 담당으로 기록돼 있습니다.',
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
  launcher.setAttribute('aria-label', 'Q/A 포트폴리오 질문');
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
  question.name = 'question';
  question.autocomplete = 'off';
  question.maxLength = 400;
  question.required = true;
  question.placeholder = '예: 밭머리에서 맡은 일은…';
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
  status.setAttribute('role', 'status');
  question.setAttribute('aria-describedby', status.id);
  form.append(label, question, captcha, submit, status);
  const links = make('div', 'pf-chat-links');
  [
    ['밭머리', 'https://github.com/da960822-ux/kidding'],
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
  document.body.append(panel);
  const launcherSlot = document.querySelector('[data-chat-launcher-slot]');
  const docked = window.matchMedia('(max-width: 1023px)');
  function placeLauncher() {
    const restoreFocus = document.activeElement === launcher;
    (docked.matches && launcherSlot ? launcherSlot : document.body).append(launcher);
    if (restoreFocus) launcher.focus();
  }
  placeLauncher();
  docked.addEventListener('change', placeLauncher);

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
    { words: ['classflow', '클래스플로우', '클래스 플로우'], answer: 'ClassFlowAI는 Windows 화면을 OCR·CAP으로 기록해 수업별 학습 자료와 복습 데이터를 만드는 개인 도구입니다.' },
    { words: ['농담', '農談', '밭머리', 'batmeori', '솔버톤', '최우수', '수상'], answer: offlineAnswers[1] },
    { words: ['genmark', '젠마크', '젠 마크'], answer: offlineAnswers[2] },
    { words: ['해빛', 'haebit', '펫', '부모', '아이'], answer: offlineAnswers[3] },
    { words: ['프론트', 'frontend', 'front-end', '화면', 'ui'], answer: offlineAnswers[3] },
    { words: ['직무', '희망', '포지션', '풀스택', 'fullstack', 'full-stack', '경험', '프로젝트'], answer: offlineAnswers[0] },
    { words: ['백엔드', 'backend', 'back-end', '서버', 'api', '데이터베이스', 'db'], answer: '밭머리에서는 FastAPI·Supabase 백엔드를, GenMark AI에서는 팀 백엔드 개발과 AI 프롬프팅을 맡았습니다.' },
  ];
  function answerLocally(text) {
    const normalized = text.toLowerCase();
    const match = localAnswers.find(item => item.words.some(word => normalized.includes(word)));
    return match ? match.answer : '준비된 답변을 찾지 못했습니다. ClassFlowAI, 밭머리, GenMark AI 또는 해빛에 대해 질문해 주세요.';
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
        callback: () => { status.textContent = '봇 검증을 완료했습니다. 질문을 보낼 수 있습니다.'; },
        'error-callback': () => {
          status.textContent = '봇 검증을 완료하지 못했습니다. 아래 프로젝트 링크를 이용해 주세요.';
        },
      });
    };
    script.onerror = () => { status.textContent = '봇 검증을 불러오지 못했습니다. 아래 프로젝트 링크를 사용할 수 있습니다.'; };
    document.head.append(script);
  }

  function toggle(open) {
    panel.hidden = !open;
    launcher.hidden = open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      loadTurnstile();
      if (docked.matches) close.focus();
      else question.focus();
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
      status.textContent = '봇 검증을 완료한 뒤 다시 보내 주세요. 검증이 보이지 않으면 아래 프로젝트 링크를 이용해 주세요.';
      return;
    }
    busy = true;
    submit.disabled = true;
    write(text, 'user');
    question.value = '';
    status.textContent = '답변을 생성하고 있습니다…';
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
