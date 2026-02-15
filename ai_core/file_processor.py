import io
import PyPDF2
import docx


class FileProcessor:

    @staticmethod
    def extract_text(file_name, content_bytes):

        text = ""

        if file_name.endswith(".pdf"):
            reader = PyPDF2.PdfReader(io.BytesIO(content_bytes))
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"

        elif file_name.endswith(".docx"):
            document = docx.Document(io.BytesIO(content_bytes))
            for para in document.paragraphs:
                text += para.text + "\n"

        else:
            try:
                text += content_bytes.decode("utf-8")
            except:
                pass

        return text

    @staticmethod
    def compress_context(text, limit=50000):
        return text[:limit]