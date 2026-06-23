import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

console.log("conf =", conf)
console.log("project =", conf.appwriteProjectId)

export class Service{
    Client= new Client();
    databases;
    bucket;

    constructor () {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.Client)
            this.bucket = new Storage(this.Client)
    }

        async createPost ({title, slug, content, featuredImage,
            status, userId})
            {
                try {
                  return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,{
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                     })
                } catch (error) {
                console.log(error);
                }
            }

        async updatePost (slug,{title,content, featuredImage,
            status}){
            try {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,{
                        title,
                        content,
                        featuredImage,
                        status
                    } )
            } catch (error) {
                console.log(error);
            }
        }

        async  deletePost (slug) {
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                ) 
                return true;
            } catch (error) {
                console.log("appwrite service:: delete post :: error",error);
                return false
            }
        }

        async getPost(slug) {
            try {
               return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                )
            } catch (error) {
                console.log(error);
                return false
            }
        }

        async getAllPost(queries=[Query.equal("status", "active") ]){
            try {
               return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries,
                    
                )
            } catch (error) {
                console.log(error);
                return false
                
            }
        }

        // file upload service

        async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file,
                )
            } catch (error) {
                 console.log(error);

        }}

        async deleteFile(file){
            try {
                 await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    file                                           
                )
                return true;
            } catch (error) {
                console.log(error);
                
            }
        }

         filePreview(file){
            
                return  this.bucket.getFileView(
                    conf.appwriteBucketId,
                    file,
                )
            
        }

        }



const service = new Service()
export default service