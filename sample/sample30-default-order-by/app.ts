import "reflect-metadata";
import {createConnection, ConnectionOptions} from "../../src/index";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";

const options: ConnectionOptions = {
    driver: {
        type: "sqlite",
        storage: "temp/sqlitedb.db"
    },
    logging: {
        logQueries: true,
        logSchemaCreation: true
    },
    autoSchemaSync: true,
    entities: [Post, Category]
};

createConnection(options).then(async connection => {

    let postRepository = connection.getRepository(Post);

    let post1 = new Post("Me", "hello me", [
        new Category("programming"),
        new Category("family"),
        new Category("chocolate"),
    ]);
    let post2 = new Post("Zorro", "hello zorro", [
        new Category("woman"),
        new Category("money"),
        new Category("weapon"),
    ]);
    let post3 = new Post("About earth", "hello earth", [
        new Category("kids"),
        new Category("people"),
        new Category("animals"),
    ]);
    let post4 = new Post("Zorro", "hello zorro", [
        new Category("woman"),
        new Category("money"),
        new Category("weapon"),
    ]);

    console.log("saving posts");
    await postRepository.persist([post1, post2, post3, post4]);

    console.log("loading the post. pay attention on order: ");
    const allPosts = await postRepository.find();
    console.log(allPosts);

}).catch(error => console.log("Error: ", error));