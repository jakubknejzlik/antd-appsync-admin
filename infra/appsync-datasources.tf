resource "aws_appsync_datasource" "dummy" {
  api_id = aws_appsync_graphql_api.main.id
  name   = "dummy"
  type   = "NONE"
}
