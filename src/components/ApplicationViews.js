import React from "react"
import { Route } from "react-router-dom"

// import { ProfileProvider } from "./auth/AuthProvider"

import { PostDetail } from "./posts/PostDetail"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { PostForm } from "./posts/PostForm"

import {CategoryProvider} from "./categories/CategoryProvider"
import {CategoryList} from "./categories/CategoryList"
import {CategoryForm} from "./categories/CategoryForm"
import {CategoryViewPosts} from "./categories/CategoryPost"
import { TagProvider } from "./tags/TagProvider"
import TagList from "./tags/TagList"
import { TagForm } from "./tags/TagForm"

import {CommentProvider} from "./comments/CommentProvider"
import {CommentForm} from "./comments/CommentForm"
import {CommentList} from "./comments/CommentList"
import { PostTagProvider } from "./PostTags/PostTagProvider"

import {UserProvider} from "./users/UserProvider"
import {UserList} from "./users/UserList"
import {UserDetail} from "./users/UserDetail"
import { SubscriptionProvider } from "./subscriptions/SubscriptionProvider"


export const ApplicationViews = (props) => {
    return (
    <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            
        </main>

        {/* Post Section Begins */}
        <TagProvider>
            <PostTagProvider>
                <PostProvider>
                    <CategoryProvider>
                        <CommentProvider>
                            <SubscriptionProvider>
                        
                                <Route exact path="/posts/:postId(\d+)" render={ props => <PostDetail history={props.history} {...props} /> } />

                                <Route exact path = "/comments/create/:postId(\d+)" render={
                                    props => {
                                        return <CommentForm {...props} />
                                    }
                                } />
                                <Route exact path = "/comments/edit/:commentId(\d+)" render={
                                    props => {
                                        return <CommentForm {...props} />
                                    }
                                } />
                            
                                <Route exact path = "/comments/post/:postId(\d+)" render={props => <CommentList history={props.history}{...props} /> } />
                                
                                
                                <Route exact path="/" render={
                                    props => {
                                        return <PostList history={props.history} />}
                                }>
                                </Route>
                                
                                <Route exact path="/posts/subscribed" render={
                                            props => <PostList {...props} />
                                        } />
                                

                                <Route exact path="/posts/myposts" render={
                                            props => <PostList {...props} />
                                        } />

                                {/* When the URL changes to /posts/create render the PostForm */}
                                <Route exact path="/posts/create" render={
                                        props => {
                                            return <PostForm {...props} />
                                        }
                                    }>
                                </Route>
                                
                                {/* When the URL changes to /posts/edit render the PostForm in edit mode */}
                                <Route exact path="/posts/edit/:postId(\d+)" render={
                                    props => {
                                        return <PostForm {...props} />
                                    }
                                }>
                                </Route>

                            </SubscriptionProvider>
                        </CommentProvider>
                    </CategoryProvider>
                </PostProvider>
            </PostTagProvider>
        </TagProvider>

        {/* Post Section Ends */}
                
        {/* Category Section Begins */}
        <PostProvider>
            <CategoryProvider>
                    <Route exact path = "/categories" render={
                        props => {
                            return <CategoryList history={props.history} />
                        }
                    } />

                    <Route exact path ="/categories/create" render={
                        props => {
                            return <CategoryForm {...props} />
                        }
                    } />

                    <Route exact path="/categories/edit/:categoryId(\d+)" render={
                        props => <CategoryForm {...props} />
                    } />

                    <Route exact path="/posts/category/:categoryId(\d+)" render={
                        props => <CategoryViewPosts {...props} />
                    } />
            </CategoryProvider>
        </PostProvider>
        {/* Category Section Ends */}

        {/* Tag Section Begins */}
        <TagProvider>
            <Route exact path = "/tags" render={
                props => {
                    return <TagList history={props.history} />
                }
            } />

            <Route exact path="/tags/create" render={
                props => <TagForm {...props} />
            } />

            <Route exact path="/tags/edit/:tagId(\d+)" render={
                props => <TagForm {...props} />
            } />
        </TagProvider>
        {/* Tag Section Ends */}

        {/* </ProfileProvider> */}
        <UserProvider>
            <PostProvider>
            <Route exact path = "/users" render={
                props => <UserList {...props} />
            } />

        
        <Route exact path="/users/:userId(\d+)" render={ props => <UserDetail history={props.history} {...props} /> } />    
            </PostProvider>
        </UserProvider>
        
    </>

    )
    
}
