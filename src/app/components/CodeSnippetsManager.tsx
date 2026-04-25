import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Code, Plus, Trash2, Save, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  language: string;
  description?: string;
  tags?: string[];
  createdAt: string;
}

export function CodeSnippetsManager() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    code: '',
    language: 'python',
    description: '',
    tags: ''
  });

  const fetchSnippets = async () => {
    setLoading(true);
    try {
      // Load snippets from localStorage
      const storedSnippets = localStorage.getItem('code_snippets');
      if (storedSnippets) {
        setSnippets(JSON.parse(storedSnippets));
      }
    } catch (error) {
      console.error('Error fetching code snippets:', error);
      toast.error('Failed to load code snippets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleSaveSnippet = async () => {
    if (!newSnippet.title || !newSnippet.code) {
      toast.error('Title and code are required');
      return;
    }

    try {
      const snippetData = {
        id: `snippet_${Date.now()}`,
        ...newSnippet,
        tags: newSnippet.tags ? newSnippet.tags.split(',').map(t => t.trim()) : [],
        createdAt: new Date().toISOString()
      };

      const updatedSnippets = [...snippets, snippetData];
      setSnippets(updatedSnippets);
      localStorage.setItem('code_snippets', JSON.stringify(updatedSnippets));
      
      toast.success('Code snippet saved successfully');
      setIsDialogOpen(false);
      setNewSnippet({ title: '', code: '', language: 'python', description: '', tags: '' });
    } catch (error) {
      console.error('Error saving snippet:', error);
      toast.error('Error saving code snippet');
    }
  };

  const handleDeleteSnippet = async (snippetId: string) => {
    try {
      const updatedSnippets = snippets.filter(snippet => snippet.id !== snippetId);
      setSnippets(updatedSnippets);
      localStorage.setItem('code_snippets', JSON.stringify(updatedSnippets));
      
      toast.success('Code snippet deleted');
    } catch (error) {
      console.error('Error deleting snippet:', error);
      toast.error('Error deleting code snippet');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Code className="w-5 h-5" />
          Code Snippets
        </h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Snippet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Code Snippet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newSnippet.title}
                  onChange={(e) => setNewSnippet({ ...newSnippet, title: e.target.value })}
                  placeholder="Enter snippet title"
                />
              </div>
              
              <div>
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  value={newSnippet.language}
                  onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="r">R</option>
                  <option value="sql">SQL</option>
                  <option value="bash">Bash</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="code">Code</Label>
                <Textarea
                  id="code"
                  value={newSnippet.code}
                  onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })}
                  placeholder="Paste your code here"
                  className="font-mono text-sm min-h-[200px]"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newSnippet.description}
                  onChange={(e) => setNewSnippet({ ...newSnippet, description: e.target.value })}
                  placeholder="Describe what this code does"
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="tags">Tags (Optional, comma-separated)</Label>
                <Input
                  id="tags"
                  value={newSnippet.tags}
                  onChange={(e) => setNewSnippet({ ...newSnippet, tags: e.target.value })}
                  placeholder="analysis, visualization, data-processing"
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveSnippet}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Snippet
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading code snippets...</div>
      ) : snippets.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No code snippets saved yet. Click "Add Snippet" to create your first one.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {snippets.map((snippet) => (
            <Card key={snippet.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{snippet.title}</CardTitle>
                    {snippet.description && (
                      <p className="text-sm text-gray-600 mt-1">{snippet.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSnippet(snippet.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <Badge variant="secondary">{snippet.language}</Badge>
                  {snippet.tags?.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{snippet.code}</code>
                </pre>
                <p className="text-xs text-gray-500 mt-2">
                  Created: {new Date(snippet.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}