// Edit this array to change the website content.
// type: "image" = photo card with optional caption
// type: "prompt" = text-only prompt card
const cards = [
  {
    id: "photo-0",
    type: "image",
    image: "photos/IMG_1768.jpeg",
    alt: "Portrait photo",
    caption: "Snatching records and stealing hearts <3"
  },
  {
    id: "photo-1",
    type: "image",
    image: "photos/IMG_5485.jpeg",
    alt: "Portrait photo",
    caption: "This is where your caption goes. Replace photos/photo1.jpg with your own image."
  },
  {
    id: "prompt-1",
    type: "prompt",
    prompt: "A green flag I look for...",
    answer: "Someone who comes with 6 portable flotation devices"
  },
  {
    id: "photo-2",
    type: "image",
    image: "photos/IMG_5504.jpeg",
    alt: "Running photo",
    caption: "Comes with 6 portable flotation devices"
  },
  {
    id: "prompt-2",
    type: "prompt",
    prompt: "Together we could...",
    answer: "Win trivia night, then pretend we were humble about it"
  },
  {
    id: "photo-3",
    type: "image",
    image: "photos/IMG_5504.jpeg",
    alt: "Running photo",
    caption: "Another photo module. Add as many of these as you want."
  },
];

const cardContainer = document.querySelector("#cardContainer");

function buildCard(card) {
  const article = document.createElement("article");
  article.className = "profile-card";
  article.dataset.cardId = card.id;

  const content = document.createElement("div");

  if (card.type === "image") {
    const img = document.createElement("img");
    img.className = "card-image";
    img.src = card.image;
    img.alt = card.alt || "Profile photo";
    article.appendChild(img);

    content.className = "card-body";
    const caption = document.createElement("p");
    caption.className = "caption";
    caption.textContent = card.caption || "";
    content.appendChild(caption);
  }

  if (card.type === "prompt") {
    content.className = "card-body";

    const label = document.createElement("p");
    label.className = "prompt-label";
    label.textContent = card.prompt;

    const answer = document.createElement("p");
    answer.className = "card-text";
    answer.textContent = card.answer;

    content.appendChild(label);
    content.appendChild(answer);
  }

  const feedback = document.createElement("div");
  feedback.className = "card-feedback";
  feedback.textContent = "";

  const voteBar = document.createElement("div");
  voteBar.className = "vote-bar";

  const xButton = document.createElement("button");
  xButton.className = "vote-button x";
  xButton.type = "button";
  xButton.setAttribute("aria-label", `Vote no on ${card.id}`);
  xButton.textContent = "×";
  xButton.addEventListener("click", () => handleVote(article, card.id, "x", xButton, feedback));

  const heartButton = document.createElement("button");
  heartButton.className = "vote-button heart";
  heartButton.type = "button";
  heartButton.setAttribute("aria-label", `Vote yes on ${card.id}`);
  heartButton.textContent = "♥";
  heartButton.addEventListener("click", () => handleVote(article, card.id, "heart", heartButton, feedback));

  voteBar.appendChild(xButton);
  voteBar.appendChild(heartButton);

  article.appendChild(content);
  article.appendChild(feedback);
  article.appendChild(voteBar);

  return article;
}

function handleVote(cardElement, cardId, voteType, button, feedbackElement) {
  // For now this stores votes locally in the visitor's browser.
  // Later, replace this with Supabase/Firebase so you can see everyone’s votes.
  const storageKey = `onhinged-vote-${cardId}`;
  localStorage.setItem(storageKey, voteType);

  const buttons = cardElement.querySelectorAll(".vote-button");
  buttons.forEach(btn => btn.classList.remove("clicked", "voted"));

  button.classList.add("clicked", "voted");
  feedbackElement.textContent = voteType === "heart" ? "♥" : "×";
  cardElement.classList.add("show-feedback");

  window.setTimeout(() => {
    button.classList.remove("clicked");
    cardElement.classList.remove("show-feedback");
  }, 350);

  console.log({ cardId, voteType });
}

function restoreLocalVotes() {
  cards.forEach(card => {
    const voteType = localStorage.getItem(`onhinged-vote-${card.id}`);
    if (!voteType) return;

    const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);
    const button = cardElement?.querySelector(`.${voteType === "heart" ? "heart" : "x"}`);
    button?.classList.add("voted");
  });
}

cards.forEach(card => {
  cardContainer.appendChild(buildCard(card));
});

restoreLocalVotes();
