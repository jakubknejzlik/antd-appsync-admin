resource "aws_cognito_user_pool" "main" {
  name = var.code

  verification_message_template {
    default_email_option = "CONFIRM_WITH_LINK"
  }

  device_configuration {
    device_only_remembered_on_user_prompt = true
  }
}

resource "aws_cognito_user_pool_client" "ui" {
  name                                 = "ui"
  user_pool_id                         = aws_cognito_user_pool.main.id
  callback_urls                        = ["https://example.com"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid"]
  supported_identity_providers         = ["COGNITO"]
}

resource "aws_cognito_user" "admin" {
  user_pool_id = aws_cognito_user_pool.main.id
  username     = "admin"
  password     = "HelloWorld123!"
}
