resource "aws_appsync_resolver" "query-test" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "test"
  type        = "Query"
  data_source = aws_appsync_datasource.dummy.name

  request_template = <<EOF
  {
    "version": "2018-05-29"
  }
  EOF

  response_template = <<EOF
"aaa"
  EOF
}
