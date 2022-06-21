package start.myspring.demo.notes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService{
    @Autowired
    private NoteRepository _nr;

    public Note newNote(Note n) {
        n = this._nr.saveAndFlush(n);
        return n;
    }

    public List<Note> getNotes(){
        return this._nr.findAll();
    }

    public boolean deleteNote(int id) {
        boolean res = false;
        try {
            this._nr.deleteById(id);    
            res = true;
        } catch (Exception e){
            
        }
        return res;

    }
}