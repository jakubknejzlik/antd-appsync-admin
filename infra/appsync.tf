resource "aws_appsync_graphql_api" "main" {
  name                = var.code
  authentication_type = "AMAZON_COGNITO_USER_POOLS"
  xray_enabled        = false

  #   tags = var.tags

  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.main.arn
    field_log_level          = "ALL"
  }

  user_pool_config {
    aws_region     = data.aws_region.current.name
    default_action = "ALLOW"
    user_pool_id   = aws_cognito_user_pool.main.id
  }

  schema = <<EOF
type Query {
  test: String
}
  EOF
}

