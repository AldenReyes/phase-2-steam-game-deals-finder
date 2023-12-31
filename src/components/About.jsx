import { useEffect, useState } from "react";
import { Comment, Container, Divider, Header } from "semantic-ui-react";
import CommentsPage from "./CommentsPage";
import CommentsForm from "./CommentsForm";

export default function About() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [comments, setComments] = useState([
    {
      id: null,
      name: "",
      comment: "",
    },
  ]);
  const handleViewButton = () => setIsCollapsed(!isCollapsed);

  function handleSubmit(e, formData) {
    e.preventDefault();
    async function postFormData() {
      try {
        const response = await fetch("http://localhost:3001/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setComments([...comments, data]);
      } catch (error) {
        console.log("Error posting comment: ", error);
      }
    }
    postFormData();
  }
  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch("http://localhost:3001/comments");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.log("Error fetching comments: ", error);
      }
    }
    getComments();
  }, []);

  return (
    <main>
      <h2 className="ui icon header">
        <i className="circular icon">
          <i
            className="fa-brands fa-react fa-spin"
            style={{ color: "#61dbfb" }}
          ></i>
        </i>
        <i className="fa-sharp fa-regular fa-browsers"></i> Built with React
      </h2>
      <Container>
        <p>
          Powered by{" "}
          <span>
            <a href="https://apidocs.cheapshark.com/">CheapShark API</a>
          </span>
        </p>
        <p>
          Developed with ❤️ by{" "}
          <span>
            <a href="https://github.com/AldenReyes/phase-2-steam-game-deals-finder">
              Alden Reyes
            </a>
          </span>
        </p>
        <p>Not affiliated with Steam. All rights respective.</p>
        <Divider />
        <Header as="h3" className="aligned">
          Have a suggestion or comment?
          <Header.Subheader content="Enter it below"></Header.Subheader>
        </Header>
        <CommentsForm
          onHandleViewButton={handleViewButton}
          onHandleSubmit={handleSubmit}
        />
      </Container>
      <Comment.Group collapsed={isCollapsed}>
        <CommentsPage comments={comments} />
      </Comment.Group>
    </main>
  );
}
