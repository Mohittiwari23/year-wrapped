// js/sectionRenderer.js

export function renderSections(data) {
  const rail = document.getElementById("cardRail");
  if (!rail) {
    console.error("cardRail not found");
    return;
  }

  rail.innerHTML = "";

  // Each card gets its animation class AND visual class assigned here
  const cardRenderers = [
    () => renderMetaCard(data.meta),
    () => renderOverviewCard(data.overview),
    () => renderTimelineCard(data.timeline),
    () => renderTimeOfDayCard(data.time_of_day),
    () => renderConversationHabitsCard(data.conversation_habits),
    () => renderTimeTogetherCard(data.time_together),
    () => renderConversationStyleCard(data.conversation_style),
    () => renderLanguageStyleCard(data.language_style),
    () => renderDailyRhythmCard(data.daily_rhythm),
    () => renderInsideJokeCard(data.inside_joke),
    () => renderLoveLanguageCard(data.love_language),
    () => renderUpliftCard(data.uplift),
    () => renderClosingCard(data.closing)
  ];

  cardRenderers.forEach(renderer => {
    const card = renderer();
    if (card) rail.appendChild(card);
  });
}

/* =========================
   CARD 1: META / INTRO
   ========================= */

function renderMetaCard(data) {
  const card = createCard(
    "theme-neutral", 
    "pattern-none", 
    "card--style-breath",
    "card--visual-envelope"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-title">${data.title}</h2>
    <p class="card-subtitle">${data.subtitle}</p>
    <p class="card-period">
      ${formatDate(data.period.from)} – ${formatDate(data.period.to)}
    </p>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 2: OVERVIEW (BIG NUMBER)
   ========================= */

function renderOverviewCard(data) {
  const card = createCard(
    "theme-rose", 
    "pattern-dots", 
    "card--style-burst",
    "card--visual-constellation"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="metric">${data.total_messages.toLocaleString()}</div>
    <p class="card-caption">messages</p>
    <p class="card-subtext">${data.subtext}</p>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 3: TIMELINE (STREAK)
   ========================= */

function renderTimelineCard(data) {
  const card = createCard(
    "theme-lavender", 
    "pattern-arcs", 
    "card--style-rhythm",
    "card--visual-thread"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="metric">${data.longest_streak_days}</div>
    <p class="card-caption">days in a row</p>
    <p class="card-subtext">${data.conversation_days} total days of conversation</p>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 4: TIME OF DAY
   ========================= */

function renderTimeOfDayCard(data) {
  const card = createCard(
    "theme-sage", 
    "pattern-waves", 
    "card--style-drift-night",
    "card--visual-moon"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="metric">${data.late_night_messages.toLocaleString()}</div>
    <p class="card-caption">messages after midnight</p>
    <p class="card-subtext">${data.subtext}</p>
    <p class="card-detail">${data.late_night_days} late nights together</p>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 5: CONVERSATION HABITS (SPLIT)
   ========================= */

function renderConversationHabitsCard(data) {
  const card = createCard(
    "theme-rose", 
    "pattern-dots", 
    "card--style-whisper-split",
    "card--visual-arrows"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="split-stats">
      <div class="stat-item">
        <p class="stat-label">Started the day</p>
        <p class="stat-value">${data.most_common_day_starter === 'you' ? 'Me' : 'You'}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Replied faster</p>
        <p class="stat-value">${data.faster_replier === 'her' ? 'You' : 'Me'}</p>
      </div>
    </div>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 6: TIME TOGETHER (DATE HIGHLIGHT)
   ========================= */

function renderTimeTogetherCard(data) {
  const card = createCard(
    "theme-lavender", 
    "pattern-arcs", 
    "card--style-drift-warm",
    "card--visual-window"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="highlights">
      ${data.highlights.map(h => `<p class="highlight-item">✦ ${h}</p>`).join('')}
    </div>
    <div class="card-detail-box">
      <p class="detail-label">Busiest day</p>
      <p class="detail-date">${formatDate(data.busiest_day.date)}</p>
      <p class="detail-metric">${data.busiest_day.message_count.toLocaleString()} messages</p>
    </div>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 7: CONVERSATION STYLE
   ========================= */

function renderConversationStyleCard(data) {
  const card = createCard(
    "theme-sage", 
    "pattern-waves", 
    "card--style-whisper-type",
    "card--visual-question"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <p class="card-interpretation">${data.interpretation}</p>
    <p class="card-detail">I asked more questions in our conversations</p>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 8: LANGUAGE STYLE (WORDS)
   ========================= */

function renderLanguageStyleCard(data) {
  const card = createCard(
    "theme-rose", 
    "pattern-dots", 
    "card--style-whisper-ink",
    "card--visual-quotes"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <p class="card-caption">${data.caption}</p>
    <div class="word-showcase">
      <div class="word-item">
        <p class="word-label">Me</p>
        <p class="word-value">"${data.defining_words.you}"</p>
      </div>
      <div class="word-item">
        <p class="word-label">You</p>
        <p class="word-value">"${data.defining_words.her}"</p>
      </div>
    </div>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 9: DAILY RHYTHM (TIMES)
   ========================= */

function renderDailyRhythmCard(data) {
  const card = createCard(
    "theme-lavender", 
    "pattern-arcs", 
    "card--style-rhythm-clock",
    "card--visual-clock"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="time-comparison">
      <div class="time-item">
        <p class="time-label">Me</p>
        <p class="time-value">${data.average_morning_time.you}</p>
      </div>
      <div class="time-item">
        <p class="time-label">You</p>
        <p class="time-value">${data.average_morning_time.her}</p>
      </div>
    </div>
    <p class="card-interpretation">${data.interpretation}</p>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 10: INSIDE JOKE (COMPARISON)
   ========================= */

function renderInsideJokeCard(data) {
  const card = createCard(
    "theme-sage", 
    "pattern-waves", 
    "card--style-whisper-pour",
    "card--visual-smile"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  
  // Calculate bar widths as percentages
  const maxCount = Math.max(data.sorry_count.you, data.sorry_count.her);
  const youWidth = (data.sorry_count.you / maxCount) * 100;
  const herWidth = (data.sorry_count.her / maxCount) * 100;
  
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="comparison-bars">
      <div class="comparison-item">
        <p class="comparison-label">I said "sorry"</p>
        <div class="comparison-bar" style="width: ${youWidth}%"></div>
        <p class="comparison-value">${data.sorry_count.you.toLocaleString()}</p>
      </div>
      <div class="comparison-item">
        <p class="comparison-label">You said "sorry"</p>
        <div class="comparison-bar" style="width: ${herWidth}%"></div>
        <p class="comparison-value">${data.sorry_count.her.toLocaleString()}</p>
      </div>
    </div>
    <p class="card-interpretation">${data.interpretation}</p>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 11: LOVE LANGUAGE
   ========================= */

function renderLoveLanguageCard(data) {
  const card = createCard(
    "theme-rose", 
    "pattern-dots", 
    "card--style-burst-heart",
    "card--visual-heart"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="metric">${data.i_love_you_count.you + data.i_love_you_count.her}</div>
    <p class="card-caption">times "I love you" was said</p>
    <p class="card-interpretation">${data.interpretation}</p>
    <div class="love-split">
      <span class="love-you">Me: ${data.i_love_you_count.you}</span>
      <span class="love-her">You: ${data.i_love_you_count.her}</span>
    </div>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 12: UPLIFT
   ========================= */

function renderUpliftCard(data) {
  const card = createCard(
    "theme-lavender", 
    "pattern-arcs", 
    "card--style-whisper-lift",
    "card--visual-lift"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <div class="metric">${data.count.toLocaleString()}</div>
    <p class="card-caption">${data.caption}</p>
    <div class="uplift-example">
      <p class="example-date">${formatDate(data.example.date)}</p>
      <p class="example-text">${data.example.summary}</p>
    </div>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   CARD 13: CLOSING
   ========================= */

function renderClosingCard(data) {
  const card = createCard(
    "theme-neutral", 
    "pattern-none", 
    "card--style-breath-final",
    "card--visual-embrace"  // 🎨 VISUAL
  );
  
  const inner = createInner();
  inner.innerHTML = `
    <h2 class="card-headline">${data.headline}</h2>
    <p class="card-final">${data.final_line}</p>
    <p class="card-signature">${data.signature}</p>
  `;
  
  card.appendChild(inner);
  return card;
}

/* =========================
   UTILITIES
   ========================= */

function createCard(theme, pattern, animClass = "", visualClass = "") {
  const card = document.createElement("article");
  card.className = `card ${theme} ${pattern} ${animClass} ${visualClass}`.trim();
  return card;
}

function createInner() {
  const inner = document.createElement("div");
  inner.className = "card-inner";
  return inner;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}