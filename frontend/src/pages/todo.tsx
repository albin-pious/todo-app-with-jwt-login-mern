import Layout from "@/components/Layout";
import Todo from "@/components/Todo";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { FC } from "react";

const TodoPage:FC = ()=>{
    useAuthRedirect()
    return(
        <>
            <Layout>
                <Todo />
            </Layout>
        </>
    )
}

export default TodoPage;