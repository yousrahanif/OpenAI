


//   const sendMessage = () => {
//     if (!message.trim()) return;  // Don't send empty messages

//     const userMessage = message.toLowerCase().trim();
//     setMessage('')

//     const assistantResponse = hardcodedResponses[userMessage] || hardcodedResponses.default;

//     setMessages((messages) => [
//       ...messages,
//       { role: 'user', content: userMessage },
//       { role: 'assistant', content: assistantResponse },
//     ])
//   }

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//       event.preventDefault()
//       sendMessage()
//     }
//   }

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Stack
//         direction={'column'}
//         width="500px"
//         height="700px"
//         border="1px solid black"
//         p={2}
//         spacing={3}
//       >
//         <Stack
//           direction={'column'}
//           spacing={2}
//           flexGrow={1}
//           overflow="auto"
//           maxHeight="100%"
//         >
//           {messages.map((message, index) => (
//             <Box
//               key={index}
//               display="flex"
//               justifyContent={
//                 message.role === 'assistant' ? 'flex-start' : 'flex-end'
//               }
//             >
//               <Box
//                 bgcolor={
//                   message.role === 'assistant'
//                     ? 'primary.main'
//                     : 'secondary.main'
//                 }
//                 color="white"
//                 borderRadius={16}
//                 p={3}
//               >
//                 {message.content}
//               </Box>
//             </Box>
//           ))}
//         </Stack>
//         <Stack direction={'row'} spacing={2}>
//           <TextField
//             label="Message"
//             fullWidth
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <Button variant="contained" onClick={sendMessage}>
//             Send
//           </Button>
//         </Stack>
//       </Stack>
//     </Box>
//   )
// }