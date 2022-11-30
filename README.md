# movies-explorer-api
 🔙🔚 часть приложения 
## Как найти мой публичный сервер 🔍
 - [x] IP 158.160.42.161
 - [x] [Backend](https://hey.nomoredomains.club/api)
### ⚙️ Функционал:
 * Регистрация и авторизация пользователя. При авторизации пользователь на клиент получает JWT токен, который безопасно хранится в httpOnly cookie. 
 * Авторизованному пользователю доступны CRUD endpoints movies, users.
 * Проверка валидного токена реализована в отдельной middleware.
 * Ошибки обрабатываются централизованно. 

### 🛠 Стек технологий:
 - [x] NodeJS
 - [x] Express
 - [x] MongoDB/Mongoose
 - [x] JWT
 - [x] bcrypt (для хеширования пароля)
 - [x] helmet, express-rate-limit

### ⏺ CRUD endpoints:
`POST /signup` создаёт пользователя с переданными в теле email, password и name

`POST /signin` проверяет переданные в теле почту и пароль и возвращает JWT

`POST /signout` удаляет JWT из куков пользователя

`GET /users/me` возвращает информацию о пользователе (email и имя)

`PATCH /users/me` обновляет информацию о пользователе (email и имя)

`GET /movies` возвращает все сохранённые текущим пользователем фильмы

`POST /movies` создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

`DELETE /movies/:id` удаляет сохранённый фильм по id

### Можно улучшить 
- [ ] ❓ pagination;
- [ ] 🛡️ заменять управляющие символы мнемониками;


