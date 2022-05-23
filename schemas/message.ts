import { list } from "@keystone-6/core";
import { checkbox, relationship, text, timestamp } from "@keystone-6/core/fields";

const Message = list({
  fields: {
    conversation: relationship({
      ref: "Conversation"
    }),
    message: text({
      defaultValue: ''
    }),
    sent: checkbox({
      defaultValue: false
    }),
    read: checkbox({
      defaultValue: false
    }),
    createdAt: timestamp({})
  }
})

export default Message
