variable "name" {
  description = "The name of the launch template"
  default     = "hc-instance"
}

variable "instance_type" {
  description = "The type of the instance to launch"
  default     = "t2.micro"
}

variable "vpc" {
  description = "The vpc for the security group to exist in"
  default     = ""
}
# --------------------------------------------
# Environment variables to set on the machines
# --------------------------------------------
variable "APP_URL" {
  default = ""
}
variable "DB_HOST" {
  default = "127.0.0.1"
}
variable "DB_DATABASE" {
  default = "homestead"
}
variable "DB_USERNAME" {
  default = "homestead"
}
variable "DB_PASSWORD" {
  default = "secret"
}
variable "AWS_ACCESS_KEY_ID" {
  default = ""
}
variable "AWS_SECRET_ACCESS_KEY" {
  default = ""
}
variable "AWS_BUCKET" {
  default = ""
}
variable "AUTH0_DOMAIN" {
  default = ""
}
variable "AUTH0_CLIENT_ID" {
  default = ""
}
variable "AUTH0_CLIENT_SECRET" {
  default = ""
}