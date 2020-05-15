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
  <div class="buff_overlay_question_timer">
   <span class="buff_overlay_question_timer_text"  data-overlay='timeLeft'>
   <%= time_to_show %>
   </span>
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
