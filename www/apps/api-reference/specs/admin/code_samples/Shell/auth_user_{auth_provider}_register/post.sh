curl -X POST '{backend_url}/auth/user/emailpass/register' \
-H 'Content-Type: application/json' \
--data-raw '{
  "email": "admin@arcangel-test.com",
  "password": "supersecret"
}'