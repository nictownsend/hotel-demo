import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Stack,
  Chip,
  Button,
  Drawer,
  Fab,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LiveChat = (props) => {
  const latestMessage = useRef();
  const [chatOpen, toggleChat] = useState(false);
  const toggleDrawer = () => toggleChat((open) => !open);
  const [messages, newMessage] = useState(() => [
    {
      message: "Hi, you're speaking with Dupinder. How can I help today?",
      type: "reply",
      time: Date.now(),
    },
  ]);
  const [enteredMessage, updateMessage] = useState("");
  const onMessageChange = ({ target: { value: message } }) =>
    updateMessage(message);

  const addMessage = () => {
    const userMessage = {
      message: enteredMessage,
      type: "user",
      time: Date.now(),
    };

    updateMessage("");

    newMessage((stack) => [...stack, userMessage]);
  };

  const generateReply = useCallback(() => {
    console.log("replying");
    const [{ message: lastMessage }] = messages.slice(-1);
    const reply = () => {
      newMessage((stack) => {
        const newStack = [...stack];
        newStack.splice(-1);
        const message =
          Math.random() * 10 > 5
            ? `I'm sorry, I didn't understand what you meant by "${lastMessage}". Please can you explain what you meant.`
            : "Hello, are you still there?";
        newStack.push({
          type: "reply",
          time: Date.now(),
          message,
        });
        return newStack;
      });
    };

    newMessage((stack) => [...stack, { type: "typing" }]);
    setTimeout(reply, Math.random() * 1000 * 10);
  }, [JSON.stringify(messages)]);

  useEffect(() => {
    latestMessage.current && latestMessage.current.scrollIntoView();
    if (!messages || messages.slice(-1)[0].type !== "user") return;
    console.log(messages);
    generateReply();
  }, [JSON.stringify(messages), generateReply]);

  const sendMessageHandler = (e) => (e.key === "Enter" ? addMessage() : null);
  return (
    <div className="live-chat">
      <Fab
        variant="extended"
        className="live-chat__button"
        onClick={toggleDrawer}
        sx={{
          right: {
            xs: "1rem",
            lg: "25%",
          },
        }}
      >
        Live Chat available
      </Fab>
      <Drawer
        open={chatOpen}
        onClose={toggleDrawer}
        anchor="bottom"
        PaperProps={{
          className: "live-chat__window",
          sx: { width: { xs: 1, sm: 1 / 2 } },
        }}
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Live Chat
            </Typography>
            <IconButton onClick={toggleDrawer} color="inherit">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Stack spacing={1} className="live-chat__message-panel">
          {messages.map((message, index) => {
            let props = {
              sx: { alignSelf: "flex-start" },
              classes: { label: "chat-bubble", root: "chat-bubble" },
              ref: latestMessage,
              key: index,
            };
            switch (message.type) {
              case "user":
                props = {
                  ...props,
                  variant: "outlined",
                  label: message.message,
                  sx: { alignSelf: "flex-end" },
                };
                break;
              case "typing":
                props = { ...props, label: "•••" };
                break;
              case "reply":
                props = { ...props, label: message.message };
                break;
              default:
                break;
            }
            return <Chip {...props} />;
          })}
        </Stack>
        <Stack direction="row" className="live-chat__message-input">
          <input
            type="text"
            onChange={onMessageChange}
            value={enteredMessage}
            style={{ width: "100%" }}
            onKeyPress={sendMessageHandler}
          ></input>
          <Button onClick={addMessage}>Send</Button>
        </Stack>
      </Drawer>
    </div>
  );
};

export { LiveChat };
