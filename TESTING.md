# Testing and Validation

## Table Of Contents

- [Testing](#testing)
- [Bugs](#bugs)
- [HTML validation](#html-validation-the-w3c-markup-validation-service)
- [CSS validation](#css-validation-the-w3c-css-validation-service---jigsaw)
- [Google Lighthouse - Audits for performance, accessibility and progressive web apps](#audits-for-performance-accessibility-and-progressive-web-apps-google-lighthouse)
- [Website responsiveness](#website-responsiveness-am-i-responsive)
- [Testing User Stories](#testing-user-stories)
- [Test Form Submission](#test-form-submission-formspree)

## Testing
The following steps were taken to test the website:

The project underwent extensive testing across multiple platforms and devices. It was tested on the latest versions of Google Chrome, Firefox, and Safari browsers. The devices used for testing included:

- iPhone 12
- MacBook Air
- iPad Air
- Ultrawide monitor
- Wide monitor
- Additionally, the project was tested on Google Chrome using the DevTools' responsive mode to ensure proper rendering across different screen sizes.

A family blind test was conducted to assess the interface's intuitiveness, ease of navigation, and overall understanding. This involved presenting the project to family members without providing any prior explanation. Their feedback was instrumental in evaluating the user experience and making necessary improvements.

Family testing revealed some design flaws, which were addressed and fixed to make sure it was easy to understand and navigate.
1. The control button to toggle between different deck sizes was called small/large, which was not clear at first site for them. resolution: button renamed to "20 cards" and "52 cards" to represent the choice of choosing between different deck sizes.
2. During the family blind test, it became apparent that the placement of cards within the game area was not immediately evident to participants, making it difficult to discern which cards belonged to the computer and which to the player. Additionally, the number on the backside of the decks was not initially obvious, leading to confusion about its representation of the cards left in the deck.
To address this issue, the following resolutions were implemented:
- Clear Labels: Labels were added to the game area to distinctly indicate which cards belonged to the player and which to the computer. This helped in distinguishing the decks and minimizing confusion.
- Deck Size Indicators: Labels with the name "Deck Size" were added next to the card decks, clearly indicating that these decks were associated with the player and the computer. The numbers displayed on these labels now accurately represent the number of cards remaining in each respective deck.
3. It was noted that some family members were confused about the purpose of certain buttons and how to initiate and play the game. In response to this feedback, the following resolutions were implemented:
- Updated Game Rules: The game rules were updated to include a more detailed explanation of what each button does, how to start the game, and how to play it. This was aimed at providing clearer instructions for users, particularly new players.
- Reviewed and Tweaked Rules: The existing game rules were reviewed and tweaked for improved clarity. This was done to ensure that the instructions were easy to understand and follow, reducing confusion among players.
4. Based on the feedback received from family members, it was observed that the game's duration could be perceived as lengthy, potentially leading to the impression of an infinite loop. While acknowledging that the length of a game can often be attributed to chance, similar to real-life card games, steps were taken to address this issue and prevent potential infinite game loops. The following modifications were made:
- Updated War Rules: Previously, during a war, only one card was placed on top of the war cards. This was revised to place 3 cards instead (2 face-down and 1 face-up), significantly increasing the chances of winning. This adjustment was particularly beneficial when aces and kings were the top cards, as the increased number of cards provided a greater opportunity to capture these cards and win the game.
- Randomization for Progression: There were instances where cards were randomized in such a way that the player and computer were continually swapping cards on each move, resulting in no progression. To address this issue, a function was introduced to shuffle the computer and player deck cards every 10th move. This helped ensure that the game maintained a level of unpredictability and progress, thereby reducing the likelihood of an infinite game loop.
After implementing these changes and conducting thorough testing, it was found that the perceived issue of an infinite game loop had been effectively resolved.

During testing, various scenarios were manually created and manipulated using the dev tools console to simulate rare occurrences. 

1. One such scenario involved multiple consecutive wars, resulting in both players running out of cards during the process. However, despite both players being out of cards, one player was still declared the winner, which was not intended.
- To address this issue, the checkWinner function was updated to include a third option, "Draw." This modification ensured that if both players ran out of cards during gameplay, the game would correctly register a draw and not assign points or declare a winner.
2. Additionally, another scenario was simulated where a player ran out of cards during a war. The intention was to confirm that the game correctly registered the player who ran out of cards as the winner and assigned victory points accordingly. However, it was observed that the checkWinner function structure was causing multiple points to be added for a single victory, which was not the intended behaviour.
- To resolve this issue, the checkWinner function was restructured. During a war scenario, when two cards were placed face-down in the war deck, the function was modified to splice these two cards immediately. This change ensured that the game accurately determined the winner by checking if any player had zero cards left after each card was played, thereby resolving the problem of multiple points being added for a single victory.

During responsive design testing, the Card Wars project was loaded on various screen types, including tablets, wide monitors, and devices with different screen resolutions. The project was primarily developed on a MacBook Air, which has a wide but not tall screen aspect ratio. 

1. During testing on tablets and wide monitors, it became apparent that cards were not being displayed correctly, and the game area was not fully visible.
- To address this issue, margins were adjusted for taller screens, and the size of cards was increased for screens with a larger or higher pixel density. 
2. Additionally, while testing on very small screens using Chrome DevTools, it was observed that game controls and cards did not have enough space to be visible simultaneously.
- To resolve this issue, adjustments were made to the content and cards to ensure they fit within the confines of very small screens. These adjustments ensured that all elements of the game were visible and accessible across a wide range of screen sizes and resolutions, providing a consistent and enjoyable user experience.

Interface and gameplay testing was conducted by playing the Card Wars game and utilizing all buttons. These tests were performed to ensure the functionality and reliability of the game's core elements:

1. **Logo Button:** Clicked to reload the game page. This action was taken to verify that the logo button functioned correctly and reloaded the game page as intended.
2. **20 Cards / 52 Cards Toggle Button:** Used to switch between 20-card and 52-card deck options. This was done to ensure that the card decks were correctly changing between these two options and that the game area was resetting accordingly.
3. **Reset Button:** Clicked to reset the game area during gameplay and after winning the game. This action was taken to ensure that the reset button functioned correctly in both scenarios and reset the game area as expected.
4. **Game Rules Button:** Clicked to view the game rules at any point during gameplay. This action was performed to ensure that the game rules were accessible and that the button to view the rules functioned correctly.
5. **Play Button:** Clicked to start the game. This action was taken to verify that the play button started the game correctly and that it disappeared at the end of the game, indicating the game-over state and forcing the user to restart the game.
6. **Keyboard Controls for Play Button:** Pressed space and enter keys to control the play button. This was done to ensure that the play button could be controlled using both the space and enter keys.
7. **Visibility of Game Area with Cards:** Checked that the game area with cards was hidden before the game started and became visible once the game started. This action was taken to ensure that the game area was only visible during gameplay and not before.
8. **Footer Social Links:** Clicked on the social links located in the footer to ensure that they opened in new tabs. This was done to verify that the social links functioned correctly and opened in separate tabs as expected.
These tests revealed that all core elements of the Card Wars game functioned correctly and did not reveal any issues or bugs. 

## Bugs

During testing, several bugs were identified and addressed. While the list below is not exhaustive, it highlights the most significant issues that were resolved:

1. **Incorrect Card Placement in Game Area:** Initially, it was not immediately evident which cards belonged to the computer and which belonged to the player. To resolve this, labels indicating "Player Cards" and "Computer Cards" were added to the game area, clearly distinguishing between the two. Additionally, the number on the back side of the decks was made more apparent, indicating the remaining cards in the deck.
2. **Confusion Over Game Buttons:** Some family members were initially confused about the buttons and how to start and play the game. To address this, the game rules were updated to provide clear explanations of each button's function and how to start and play the game. The rules were also reviewed and improved for greater clarity.
3. **Prevention of Infinite Game Loop:** To prevent a possible infinite game loop, additional measures were taken. During war scenarios, the game now places three cards (two face-down and one face-up) instead of one on top of the war cards. This greatly increases the chances of capturing cards like aces and kings, which are often the top cards involved in wars. Additionally, to address scenarios where cards were randomly shuffled in a way that prevented progression, a function to shuffle the player and computer decks every tenth move was introduced. This resolved the issue of an infinite game loop.
4. **Multiple Wars and Running Out of Cards:** Testing revealed an issue where multiple wars following one another resulted in both players running out of cards, yet one player was still declared the winner. This was not intended. To address this, a third option, "Draw", was added to the checkWinner function. Now, when players run out of cards during gameplay, the game correctly registers a draw and assigns no points or victory to either player.
5. **Responsive Design Issues:** While the project was developed primarily using a MacBook Air, which has a wide but not tall screen aspect ratio, it was observed that the game area and cards did not display correctly on tablet and wide monitors. Additionally, in Chrome DevTools' responsive mode, it was noted that there were issues on very small screens where the game controls and cards did not have enough space to be visible simultaneously. To resolve these issues, margins were adjusted for taller screens, and the card size was increased for devices with larger or higher pixel density screens. Furthermore, adjustments were made to accommodate very small screens, ensuring that game controls and cards were visible simultaneously.

### Unfixed bugs

While conducting testing, several issues were identified that remain unresolved:

1. **Mobile Device CSS Styles for Card Suits:** On mobile devices, CSS styles for card suits are not recognized, and they are replaced with emoji icons by default. While this may appear as a nice feature, it was not the intended behavior. The original intention was to display clubs and spades suits in an ink blue color, rather than black emojis. This issue may be addressed in future updates to the game.
2. **Card Deck Display:** In some scenarios, such as when a card deck runs out of cards during gameplay, the deck is not hidden as intended, and the deck size is displayed as zero. While this is not intended behavior, it may occur in specific scenarios. This issue is not currently addressed.
3. **Design Flaw in War Scenario:** In multiple war scenarios, or when war results are displayed, there may be a perception that the game's mathematical logic is representing the wrong deck count. This is not a bug but a design flaw. For example, in a single war scenario, when the war result is displayed, it may appear as though 8 cards are missing between the computer and player decks. However, this is because two cards from the initial card war start are still in the war deck, along with an additional 6 cards (4 face-down and 2 face-up) between both players in the war pile. With the next move, all cards are returned, and deck sizes are displayed correctly again. This issue may be more apparent during multiple wars or when the game ends with one of the players running out of cards during the war phase.