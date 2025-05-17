import { notification } from "antd"

export const ErrorNotification = (error: unknown) => {
  notification.error({
    message: String(error),
    placement: "top"
  })
}