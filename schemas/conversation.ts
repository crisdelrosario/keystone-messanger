import { list } from "@keystone-6/core";
import { relationship, timestamp } from "@keystone-6/core/fields";

const Conversation = list({
  fields: {
    sender: relationship({
      ref: 'User'
    }),
    receiver: relationship({
      ref: 'User'
    }),
    createdAt: timestamp({
    })
  }
})

export default Conversation
