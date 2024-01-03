import {useParams} from 'react-router-dom';
import useFetch from './useFetch';
import { useHistory } from 'react-router-dom';
export default function BlogDetails() {
    const {id}=useParams(); 
    const {data:blog,error,isPending}=useFetch('http://localhost:8000/blogs/'+id);
    const history=useHistory();
    const handleClick=()=>{
        fetch('http://localhost:8000/blogs/'+blog.id,{

            method:'DELETE'
        }).then(()=>{
            history.push('/');
        })}
  return (   
    <div className='blog-details'>
        {isPending&&<div>Loading...</div>}
        <button onClick={() => history.push(`/blogs/${id}/edit`)}>Edit</button>

        {error&&<div>{error}</div>}
        {blog&&(
            <article>
                <h2>{blog.title}</h2>
                <p>written by {blog.author}</p>
                <div>{blog.body}</div>
            <button onClick={handleClick}>delete</button>
            </article>
        )}
    </div>
  )
}