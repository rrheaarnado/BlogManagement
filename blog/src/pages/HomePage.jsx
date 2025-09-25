import Header from "../components/Header";
import PostList from "../components/PostList";
import BottomInputBar from "../components/BottomInputBar";

function HomePage() {
  const handleAddItem = (item) => {
    console.log("Add item:", item);
  };

  return (
    <>
      <Header />
       <div className="mt-15">   {/* <-- add margin top here */}
      <PostList />
      </div>
      <BottomInputBar onAdd={handleAddItem} />
    </>
  );
}

export default HomePage;
