from llama_index import download_loader, VectorStoreIndex
from llama_index.node_parser import SimpleNodeParser

def setup_index(document_ids):
    # Load Data
    GoogleDocsReader = download_loader('GoogleDocsReader')
    loader = GoogleDocsReader()
    documents = loader.load_data(document_ids=document_ids)

    # Create Nodes
    parser = SimpleNodeParser.from_defaults(chunk_size=1024, chunk_overlap=20)
    nodes = parser.get_nodes_from_documents(documents)

    # Build Index
    index = VectorStoreIndex.from_documents(documents)



    # Save the index to a file for later use
    index.save("'backend/llama_index_file'")


if __name__ == "__main__":
    # Replace with actual document IDs
    document_ids = [...]  
    index = setup_index(document_ids)
    # Additional code to save or use the index can be added here
