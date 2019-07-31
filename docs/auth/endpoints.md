# Endpoints

```
POST /api/v1/auth/register

receive:
{
  username,
  password
}

response:
{
  message
}
```

```
POST /api/v1/auth/login

receive:
{
  username,
  password
}

response:
{
  access_token,
  refresh_token,
  expires
}
```

```
POST /api/v1/auth/refresh

receive:
{
  refresh_token
}

response:
{
  access_token,
  refresh_token,
  expires
}
```
