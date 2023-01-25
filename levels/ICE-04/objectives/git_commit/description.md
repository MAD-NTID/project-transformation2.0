# Using Git Commit
When we commit a change, we store a new snapshot to the list of snapshots locally. This way we can go back to a different
snapshot if something screw up.

In your project, run the following command
```git commit -m"code is ready for launch"```

The ``-m`` is a flag that allows us to add a message to the snapshot. Always use meaningful messages
when committing your changes. This is used to communicate with other developers and yourself as to what was changed.

After committing, run the ``git status``, you should see ```Your branch is ahead of 'origin/main' ``` This is because
your computer now have the latest copy and the remote (GitHub code is "outdated").
