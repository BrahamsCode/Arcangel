import { Logger, NotificationTypes } from "@arcangel/framework/types"
import { AbstractNotificationProviderService } from "@arcangel/framework/utils"
import { ArcangelCloudEmailOptions } from "@types"

export class ArcangelCloudEmailNotificationProvider extends AbstractNotificationProviderService {
  static identifier = "notification-arcangel-cloud-email"
  protected options_: ArcangelCloudEmailOptions
  protected logger_: Logger

  constructor({}, options: ArcangelCloudEmailOptions) {
    super()

    this.options_ = options
  }

  async send(
    notification: NotificationTypes.ProviderSendNotificationDTO
  ): Promise<NotificationTypes.ProviderSendNotificationResultsDTO> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${this.options_.api_key}`,
    }

    if (this.options_.sandbox_handle) {
      headers["x-arcangel-sandbox-handle"] = this.options_.sandbox_handle
    }

    if (this.options_.environment_handle) {
      headers["x-arcangel-environment-handle"] = this.options_.environment_handle
    }

    try {
      const response = await fetch(`${this.options_.endpoint}/send`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          to: notification.to,
          from: notification.from,
          attachments: notification.attachments,
          template: notification.template,
          data: notification.data,
          provider_data: notification.provider_data,
          content: notification.content,
        }),
      })
      const responseBody = await response.json()

      if (!response.ok) {
        throw new Error(
          `Failed to send email: ${response.status} - ${response.statusText}: ${responseBody.message}`
        )
      }

      return { id: responseBody.id }
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`)
    }
  }
}
