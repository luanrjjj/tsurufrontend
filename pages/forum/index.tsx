import React, {useEffect,useState} from "react";
import {BsFillChatFill} from 'react-icons/bs';
import {AiFillEye,AiOutlineSearch} from 'react-icons/ai';



import {
  Container,
  ContainerContent,
  ContentSection,
  FiltersSection,
  Header,
  HeaderContainer,
  HeaderContent,
  HeaderLinks,
  HeaderLogo,
  HeaderTitle,
  Thread,
  ThreadDetails,
  Threads,
  ThreadsSection,
  TitleThread
  
 
} from './styles'

import logoImg from '../../assets/images/origami.png';
import userImg from '../../assets/images/user.png';


import api from '../../services/api';



interface Post {
  id:string;
  title:string;
  
}


interface Thread {
  id:string;
  title:string;
  body:string;
  created_at:string;
  updated_id:string;
  creator: {
    name:string;
  };
  category:string;
  solved:number;
  
}

interface Threads {
  threads:Thread[]
}

interface Posts {
  posts:Post[]
}
const Forum:React.FC = () => {
 const [threads,setThreads] = useState<Thread[]>([])

  

  useEffect(() => {
     api.get('/api/threads').then(response=>  {
      setThreads(response.data);
    })
  },[])

  



  return (
    <>
    <Container>
    <ContainerContent>
      <HeaderContainer>
        <Header>

          <HeaderLogo><img src={logoImg.src}></img></HeaderLogo>
          <HeaderTitle>
          <span>Cerebriz</span>
          </HeaderTitle>

          <HeaderLinks>
            <span>Home</span>
            <span>Profile </span>
            <span>Cursos</span>
            
            
          </HeaderLinks>
         
          <HeaderContent>
            <div className="HeaderIcons">
           <AiOutlineSearch size={25} color={"#FFF"}/>
           
           </div>
            </HeaderContent>
          
        </Header>
        </HeaderContainer>
        
        <ContentSection>
       
            <ThreadsSection>
              <FiltersSection>

             
               <div>
                
                    <a>My Questions</a>
                 
                    <a>My Participation</a>
                  
                    <a>My Best Answers</a>
               </div>
                    <button>New Discussion</button>
                   
              </FiltersSection>
            <Threads>
           
                  <ol>
                    {threads?.map(({ id, title,body,created_at,creator,category,solved }:Thread) => (
                       <Thread>
                         <div className="userImg">
                           <div>
                          <img src={userImg.src}></img>
                          </div>
                          </div>
                          <li key={id}>
                         
                            <TitleThread>
                              <h1>{title}</h1>
                              <div>
                              
                              <div className="RepliesCount">
                                
                              </div>
                              <div className="VisualizationsCount">
                               
                                
                              </div>
                              </div>
                              </TitleThread>
                            <ThreadDetails>                                       
                              <p>{creator.name}</p>
                              {solved==1 ? <a className="Solved">solved</a>:''}
                              <a className="Category">{category}</a>
                            </ThreadDetails>   
                            <p></p>
                          </li>
                          </Thread>
                        ))}
                    </ol>
                   
                  </Threads>
                  </ThreadsSection>
                  </ContentSection>
          </ContainerContent>
          
          
          
          </Container>
                      
          </>
  );
}
export default Forum