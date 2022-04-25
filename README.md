# RNSampleBookProject

This project is a sample project that shows my coding style.

This proejct consists of three screens. 
NewBookScreen shows information about the new book.
SearchBookScreen allows users to search for books with keywords. When the user lowers the screen, more books are loaded.
BookmarkScreen shows information about the bookmarks that user has bookmarked.

Promise is used for network. Apis are specifed in BookRepository.ts file.
Redux is used to store bookmarks, since bookmark data needs to respond to user interactions received from various screens.

It is highly recommended to use VSCode with eslint and pritter set. 

To run the proejct folllow these steps.
1. clone project
2. go to the proejct folder, then run command "npm install"
3. run command "cd ios && pod install && cd .."
4. run command "npm run"

![RNBooksample](https://user-images.githubusercontent.com/69378425/165094500-96e837a2-6f44-45eb-88bb-8038c6c61371.gif)
