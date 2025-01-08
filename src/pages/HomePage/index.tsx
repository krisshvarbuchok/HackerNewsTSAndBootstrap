import { FC, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchGetInfo, fetchGetList } from "../../redux/slice/listSlice";

export const HomePage :FC = () => {
    const data = useAppSelector(state => state.list.data);
    const info = useAppSelector(state => state.list.info);
    console.log(info);
    
    const dispach = useAppDispatch();

    useEffect(() => {
        dispach(fetchGetList());
      }, []);
      useEffect(() => {
        data?.forEach(item => dispach(fetchGetInfo(item)));
      }, [dispach, data])

    return (
        <>
         <div>
            Header
         </div>
         <ul>
            {info?.map(item => {
                return <li key={item.id}>
                    {item.title}
                </li>
            })}
         </ul>
         <div>
            Footer
         </div>
        </>
    )
} 