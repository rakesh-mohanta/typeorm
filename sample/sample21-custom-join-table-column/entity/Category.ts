import {PrimaryGeneratedColumn, Column, Table} from "../../../src/index";
import {ManyToMany} from "../../../src/decorator/relations/ManyToMany";
import {Post} from "./Post";

@Table("sample21_category")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @ManyToMany(type => Post, post => post.categories)
    posts: Post[];

}