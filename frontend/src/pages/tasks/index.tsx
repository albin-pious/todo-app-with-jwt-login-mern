import Layout from "@/components/Layout";
import Tasks from "@/components/tasks/Tasks";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { FC } from "react";

const TaskPage:FC = ()=>{
    useAuthRedirect()
    return(
        <>
            <Layout>
                <Tasks />
            </Layout>
        </>
    )
}

export default TaskPage;