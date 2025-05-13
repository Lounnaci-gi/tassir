export default function Article() {
    const ArticleStyle = {
      backgroundColor: "#00D054",
      padding: "20px",
    borderRadius: "8px",
      width: "30%",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow : "0 5px 15px black",
      color: "white",
      textAlign: "center",
     
    }
    return (
        <div style={ArticleStyle}>
            <h4>Raison sociale</h4>
            <p>Adresse</p>
            <hr/>
            <p>Article</p>
        </div>
    )
}