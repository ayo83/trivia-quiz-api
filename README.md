# trivia-quiz-backend
Trivia Quiz application is a quiz app that fetch 10 random questions for users to answer, Mark questions, Grade player and save player's grade.

------------------------------------------------------------------------------------------------------------------------------------------------

Trivia Quiz application, Json file with a provided list of questions is loaded to a Database from which 10 random questions are picked per fetching of questions. The submit question API expect Player Name and Arrays of answers from the client, on submission The score is calculated upon submission according the user's choice and the correct answer which is provided in the question, so before the calculated scores is returned as a json, the system validates the provided name before storing the player's GRADE, If player's name does not exist in the database, A new instance with the player Name and Grade is created but if the player's name exist, the system finds the user's collect and push to the player's new score to he/her array of GRADES. Then a detailed score is returned  to the client in  json. Note: Grades are on percentage. Find the link to the API documetation below.

LINK TO THE API DOCUMENTATION
https://documenter.getpostman.com/view/7964749/TVKJwu1f  
