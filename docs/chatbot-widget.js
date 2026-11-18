(() => {
  'use strict';
  const config = window.PORTFOLIO_CHAT_CONFIG || {};
  const enabled = String(config.apiUrl || '').startsWith('https://') && !!config.turnstileSiteKey;
  const projects = [
    {
      name: '밭머리', url: 'https://github.com/da960822-ux/kidding#readme',
      terms: ['밭머리', 'batmeori', '농담'],
      answer: '밭머리에서 FastAPI·Supabase 백엔드, 접근 권한, 버전 트랜잭션, 전달 API를 맡았습니다.',
    },
    {
      name: 'GenMark AI', url: 'https://github.com/mgim14636-art/GenMark_AI#readme',
      terms: ['genmark', '젠마크', '젠 마크'],
      answer: 'GenMark AI는 로고 생성과 상표 유사도 분석 서비스입니다. 팀 README에 백엔드 개발과 AI 프롬프팅 담당으로 기록되어 있습니다.',
    },
    {
      name: '해빛', url: 'https://github.com/kimyoungsu61/Child_Habit#readme',
      terms: ['해빛', 'haebit'],
      answer: '해빛에서 HTML·CSS·JavaScript로 부모·아이 화면, 미션 인증 UI, 보상과 펫 화면을 구현했습니다.',
    },
    {
      name: 'ClassFlowAI', url: '#major-arcana-plates',
      terms: ['classflow', '클래스플로우', '클래스 플로우'],
      answer: 'ClassFlowAI는 Windows 화면을 OCR·CAP으로 기록하고 수업 요약, 영어 학습 자료와 복습 데이터를 만드는 개인 프로젝트입니다.',
    },
  ];
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };
  const launcher = make('button', '', '포트폴리오 질문');
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
  titleBox.append(make('strong', '', '포트폴리오 질문'));
  titleBox.append(make('p', '', '프로젝트 소개 또는 AI 답변을 확인하세요.'));
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
  question.name = 'question';
  question.autocomplete = 'off';
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
  const status = make('span', '', enabled ? 'AI 질문에는 봇 검증이 필요합니다.' : '준비된 답변으로 안내합니다.');
  status.id = 'pf-chat-status';
  status.setAttribute('role', 'status');
  question.setAttribute('aria-describedby', status.id);
  form.append(label, question, captcha, submit, status);
  function projectLink(project) {
    const external = project.url.startsWith('https://');
    const link = make('a', '', `${project.name} ${external ? 'README' : '프로젝트 소개'}`);
    link.href = project.url;
    if (external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.addEventListener('click', () => toggle(false));
    }
    return link;
  }
  const links = make('nav', 'pf-chat-links');
  links.setAttribute('aria-label', '프로젝트 근거');
  projects.forEach(project => {
    links.append(projectLink(project));
  });
  panel.append(header, messages, quick, form, links);
  document.body.append(panel, launcher);

  let widgetId = null;
  let busy = false;
  const write = (text, type = 'bot', sources = []) => {
    const div = make('div', `pf-bubble ${type}`, text);
    sources.forEach(project => div.append(projectLink(project)));
    messages.append(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  };
  write(enabled ? '프로젝트 버튼에서 README 기반 소개를 바로 볼 수 있습니다. AI 질문에는 비밀번호나 개인정보를 입력하지 마세요.' : '프로젝트 버튼에서 준비된 소개와 근거 링크를 볼 수 있습니다.');
  function findProjects(text) {
    const normalized = text.toLowerCase();
    return projects.filter(project => project.terms.some(term => normalized.includes(term)));
  }
  projects.forEach(project => {
    const button = make('button', '', project.name);
    button.type = 'button';
    button.addEventListener('click', () => {
      write(project.name, 'user');
      write(project.answer, 'bot', [project]);
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
    script.onerror = () => {
      status.textContent = '봇 검증을 불러오지 못했습니다. 위 프로젝트 버튼에서 소개를 확인해 주세요.';
      script.remove();
    };
    document.head.append(script);
  }

  function toggle(open) {
    panel.hidden = !open;
    launcher.hidden = open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      loadTurnstile();
      if (window.matchMedia('(pointer: coarse)').matches) close.focus();
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
      const matches = findProjects(text);
      if (matches.length) matches.forEach(project => write(project.answer, 'bot', [project]));
      else write('준비된 답변이 없습니다. 위 프로젝트 버튼에서 확인할 항목을 선택해 주세요.');
      question.value = '';
      status.textContent = '포트폴리오의 준비된 내용을 바탕으로 안내했습니다.';
      return;
    }
    const token = widgetId !== null ? window.turnstile?.getResponse(widgetId) : '';
    if (!token) {
      status.textContent = '봇 검증을 완료한 뒤 다시 보내거나, 위 프로젝트 버튼을 이용해 주세요.';
      return;
    }
    busy = true;
    submit.disabled = true;
    write(text, 'user');
    status.textContent = '답변을 생성하고 있습니다…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: text, turnstileToken: token }),
        signal: controller.signal,
      });
      const payload = response.ok ? await response.json() : null;
      if (typeof payload?.answer === 'string' && payload.answer.trim()) {
        write(payload.answer, 'bot', findProjects(text));
        if (question.value.trim() === text) question.value = '';
        status.textContent = 'AI 답변의 세부 내용은 프로젝트 자료와 대조해 주세요.';
      } else if (response.status === 429) {
        write('오늘의 질문 한도에 도달했습니다. 프로젝트 GitHub 링크에서 상세 내용을 확인해 주세요.');
        status.textContent = '오늘은 프로젝트 소개나 README를 이용해 주세요.';
      } else if (response.status === 403) {
        write('봇 검증이 실패했습니다. 다시 인증한 뒤 질문해 주세요.');
        status.textContent = '인증을 다시 완료한 뒤 보내 주세요.';
      } else {
        write('현재 AI 답변을 제공할 수 없습니다. 아래 GitHub 링크를 이용해 주세요.');
        status.textContent = '질문은 입력창에 남아 있습니다. 잠시 후 다시 보내 주세요.';
      }
    } catch {
      write('연결을 확인할 수 없습니다. 아래 프로젝트 링크를 이용해 주세요.');
      status.textContent = '연결을 확인한 뒤 입력창의 질문을 다시 보내 주세요.';
    } finally {
      clearTimeout(timeout);
      busy = false;
      submit.disabled = false;
      if (widgetId !== null) window.turnstile?.reset(widgetId);
    }
  });
})();
