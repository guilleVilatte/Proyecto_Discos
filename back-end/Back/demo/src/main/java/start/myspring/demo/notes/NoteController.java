package start.myspring.demo.notes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(path="/discos")
public class NoteController {
	@Autowired
	private NoteService ns;

	@PostMapping("/post")
	public Note createNote(@RequestBody Note note){
		Note noteId = ns.newNote(note);
		return noteId;
	}
	
	@GetMapping
	public List<Note> readNotes() {
		return ns.getNotes();
	}

	@DeleteMapping("{id}")
	public boolean deleteNotes(@PathVariable("id")Integer id){
		return ns.deleteNote(id);
	}

}
