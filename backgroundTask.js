const bkFunc = async () => {
  console.log("Received custom task");
  let response = await fetch(
    "https://facebook.github.io/react-native/movies.json"
  );
  let responseJson = await response.json();
  sendPushNotification("subject", responseJson.description);
  console.log("[BackgroundFetch] response: ", responseJson);
};

const createMessage = async () => {
  const Odoo = new OdooConfig(user.email, user.password);

  await Odoo.odoo
    .connect()
    .then((response) => {
      console.log(response.success);
      if (response.success) {
        //////////////////////////////////////////////
        // get all messages and add them to  the discuss context. this will make it easier to navigate between chats
        const params = {
          model: "mail.channel",
          res_id: 6,
          body: "body",
          channel_ids: [6],
          author_id: user.partner_id,
          author_avatar: user.more_info[0].image_1920,
        };

        Odoo.odoo
          .create("mail.message", params)
          .then((response) => {
            // immediately add the newly created message to the context data, this will make it appear on the chat box immediately
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
        ///////////////////////////////////////////////////
      } else {
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// useEffect(() => {
//   // Configure it.
//   BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
//       // Android options
//       forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
//       enableHeadless: true,
//       stopOnTerminate: false,
//       startOnBoot: true,
//     },
//     async (taskId) => {
//       console.log("[js] Received background-fetch event: ", taskId);

//       // await createMessage();
//       // switch (taskId) {
//       //   case "com.odoomobile.notificationtask":
//       //     await createMessage();

//       // if (user) {
//       //   const Odoo = new OdooConfig(user.email, user.password);
//       //   Odoo.odoo
//       //     .connect()
//       //     .then(async (response) => {
//       //       console.log(response.success);
//       //       console.log(user.email, "||", user.password);
//       //       if (response.success) {
//       //         //////////////////////////////////////////////
//       //         // get all messages and add them to  the discuss context. this will make it easier to navigate between chats
//       //         const params = {
//       //           domain: [["message_type", "=", "notification"]],
//       //           fields: [
//       //             "id",
//       //             "subject",
//       //             "body",
//       //             "author_id",
//       //             "author_avatar",
//       //             "message_type",
//       //             "channel_ids",
//       //             "date",
//       //           ],
//       //           order: "date DESC",
//       //         };

//       //         await Odoo.odoo
//       //           .search_read("mail.message", params)
//       //           .then((response) => {
//       //             if (response.data) {
//       //               const notes = response.data.filter((el) => {
//       //                 return el.subject;
//       //               });
//       //               addNotifications(notes);

//       //               console.log(
//       //                 "New Notification ......",
//       //                 newNotifications
//       //               );
//       //               //check if there's any new notification, then send the push notification if there is
//       //               if (newNotifications) {
//       //                 newNotifications.map((n) => {
//       //                   sendPushNotification(n.subject, n.body);
//       //                 });
//       //               }
//       //             } else {
//       //               addNotifications(response.data);
//       //             }
//       //           })
//       //           .catch((e) => {
//       //             console.log(e);
//       //           });
//       //       } else {
//       //       }
//       //     })
//       //     .catch((e) => {
//       //       console.log(e);
//       //     });
//       // }
//       //     break;
//       //   default:
//       //     console.log("Default fetch task");
//       // }

//       // Required: Signal completion of your task to native code
//       // If you fail to do this, the OS can terminate your app
//       // or assign battery-blame for consuming too much background-time
//       BackgroundFetch.finish(taskId);
//     },
//     (error) => {
//       console.log("[js] RNBackgroundFetch failed to start");
//     }
//   );

//   // And with with #scheduleTask
//   BackgroundFetch.scheduleTask({
//     taskId: "com.odoomobile.notificationtask",
//     // delay: 300000, // milliseconds
//     delay: 60000,
//     forceAlarmManager: true,
//     enableHeadless: true,
//     stopOnTerminate: false,
//     startOnBoot: true,
//     periodic: true,
//   });

//   // Optional: Query the authorization status.
//   BackgroundFetch.status((status) => {
//     switch (status) {
//       case BackgroundFetch.STATUS_RESTRICTED:
//         console.log("BackgroundFetch restricted");
//         break;
//       case BackgroundFetch.STATUS_DENIED:
//         console.log("BackgroundFetch denied");
//         break;
//       case BackgroundFetch.STATUS_AVAILABLE:
//         console.log("BackgroundFetch is enabled");
//         break;
//     }
//   });
// }, []);
