import { serverhttp } from "./app"


serverhttp.listen(4000, () => {
    console.log("server is running on port 4000")
})