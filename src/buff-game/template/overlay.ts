// eslint-disable-next-line @typescript-eslint/no-var-requires
const ProgressBar = require('progressbar.js');

export const templateOverlay = `
<div class="buff_overlay FadeIn" data-overlay='overlay' >

<div class="buff_overlay_close">
    <a class="buff_overlay_close_button" data-overlay='close' ></a>
</div>

<div class="buff_overlay_user">
<img src="<%= author.image %>"  class="buff_overlay_user_img" >
<span class="buff_overlay_user_name">
<%= author.first_name %>
<%= author.last_name %>
</span>
</div>

<div class="buff_overlay_question">
  <div class='buff_overlay_question_text'>
    <%= question.title %>
  </div>
  <div class="buff_overlay_question_timer" data-overlay='timeLeft'>
  </div>
</div>

<% for(let i=0; i < answers.length; i++) { %>
  <div class="buff_overlay_answer" data-overlay='answer-<%= answers[i].id  %>'>
    <span class="buff_overlay_answer_text">
        <%= answers[i].title %>
    </span>
  </div>
<% } %>
</div>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const countDownTimer = (container: Element): any => {
  return new ProgressBar.Circle(container, {
    color: '#e6e6e6',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 8,
    trailWidth: 0,
    text: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        padding: '0px',
        margin: '0px',
        transform: 'translate(-50%, -50%)',
        'font-size': '18px',
      },
    },
    from: { color: '#ff0000', width: 8 },
    to: { color: '#fffb00', width: 8 },
    // Set default step function for all animate calls
    step(state: any, circle: any): void {
      circle.path.setAttribute('stroke', state.color);
    },
  });
};
