module "main" {
  # source = "https://github.com/jakubknejzlik/antd-appsync-admin.git/infra"
  source = "./infra"
  code   = "example-project"
}

provider "aws" {
  # Configuration options
  default_tags {
    tags = {
      "app" = "example-project"
    }
  }
}
